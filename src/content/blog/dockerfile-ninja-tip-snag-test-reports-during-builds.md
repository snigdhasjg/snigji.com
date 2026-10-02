---
title: 'Dockerfile Ninja Tip: Snag Test Reports During Builds'
description: 'Extract test reports from a multi-stage Docker build with a scratch reporting stage and docker build -o.'
pubDate: 2024-07-02
tags: ['docker', 'cicd']
---

Your Docker build runs smoothly, tests fly by, but where are the reports? Docker's multi-stage builds rock, but getting those reports out during the build can be a pain, as myself and my colleagues, [Ravali Erukulla](https://www.linkedin.com/in/ravali-erukulla-b827b284/) and [Siddhant Agarwal](https://www.linkedin.com/in/siddhantagarwal7/), recently discovered.

We all know the struggle of installing stuff like the build SDK on the pipeline agent just to run tests separately. Not ideal, especially when you need your builds to work anywhere.

In this blog, we'll crack that code! We'll show you how to pull reports right out of your Docker builds, all without messing up your workflow. This way, your tests run the same way every time, no matter the machine, and your reports are crystal clear for everyone to see, be it you or your fancy automation tools. Let's jump in and see how this works!

## What You Already Got (Under the Hood)

Imagine building a sweet Docker image, but the test reports vanish like a magician's trick! Here's your typical .NET project Dockerfile setup:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:7.0-jammy AS builder

WORKDIR /app
COPY . .

# Download dependency and build
RUN dotnet build blogpost.sln -c Release
# Running test
RUN dotnet test blogpost.sln --filter FullyQualifiedName~Tests -c Release --no-build -l trx -r /app/reports
# Final build artifact creation
RUN dotnet publish "api/api.csproj" --no-build -c Release -o /app/publish

####################### final stage ######################
FROM mcr.microsoft.com/dotnet/aspnet:7.0-jammy AS final

WORKDIR /app
COPY --from=builder /app/publish .

ENTRYPOINT ["dotnet", "api.dll"]
```

The problem? Those test reports (`/app/reports`) are chilling in the builder stage, not making it to the final image. We need a way to snag them without adding extra baggage!

## Introducing the "Report Grabber" Stage

Those test reports are hiding in the builder stage! Let's add a new stage to grab them.

### 1. The "Scratch" Reporter Stage

```dockerfile
FROM scratch AS reporting
```

This line creates a new, empty stage named `reporting`. Think of it like a blank canvas, perfect for storing just the reports. The `scratch` image lacks any folders or files and serves as the starting point for building out images.

### 2. Copying the Reports

```dockerfile
COPY --from=builder /app/reports /
```

This line grabs the test reports from the builder stage and puts them directly into our reporting stage.

### Ready to Roll!

This simple addition enables extracting the test reports for further analysis outside the Docker build process. Now you can see how your tests performed without cluttering up your final image. 😎

## Snagging the Reports and Bringing Them Home

Now that we have the "Report Grabber" stage set up, let's get those test reports out!

### Building and Exporting

Build the image normally using:

```sh
docker build -t blogpost .
```

To grab the reports, run the same build command but with two twists:

```sh
docker build -t blogpost . --target reporting -o ./reports
```

- `--target reporting`: This tells Docker to stop at the reporting stage, where our reports are waiting.
- `-o ./reports`: This specifies where to save the reports on your machine (e.g., `./reports`).

Voila! Your test reports will be neatly placed in the `./reports` directory on your Docker host, ready for your analysis or to be used by automation tools.

## Bonus Tip: Build Efficiency

Docker is clever and caches things to save time. So, if you haven't made any changes to your code, the build process for the reporting stage will be super fast! This is because Docker can reuse the already built layers from the previous build.

### Alternative Order (Optional)

You can also build the reporting stage first and then the final image stage. This will only run the builder stage once as long as there are no changes.

## Final Dockerfile (with Reporting Stage)

Here's the complete Dockerfile with the "Report Grabber" stage included:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:7.0-jammy AS builder

WORKDIR /app
COPY . .

RUN dotnet build blogpost.sln -c Release
RUN dotnet test blogpost.sln --filter FullyQualifiedName~Tests -c Release --no-build -l trx -r /app/reports
RUN dotnet publish "api/api.csproj" --no-build -c Release -o /app/publish

##################### reporting stage #####################
FROM scratch AS reporting

COPY --from=builder /app/reports /

####################### final stage ######################
FROM mcr.microsoft.com/dotnet/aspnet:7.0-jammy AS final

WORKDIR /app
COPY --from=builder /app/publish .

ENTRYPOINT ["dotnet", "api.dll"]
```
