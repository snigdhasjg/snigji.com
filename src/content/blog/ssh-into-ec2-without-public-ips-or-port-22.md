---
title: 'SSH into EC2 Without Public IPs or Port 22'
description: 'SSH with aws ssm start-session CLI command'
pubDate: 2024-07-24
tags: ['aws', 'ssm', 'ssh', 'ec2']
---

> TLDR; SSH with aws ssm start-session CLI command

Say Goodbye to Firewall Hassles: Embrace AWS SSM StartSession

Fed up with juggling firewall rules and whitelisting countless IPs for SSH access to EC2 instances? Opening port 22 to the world feels like inviting trouble—think brute-force attacks and compliance headaches.

But fear not! This blog unveils how AWS SSM StartSession swoops in as your security hero, offering safe passage to your EC2 instances without public IPs or port 22 exposure. Let's dive in!

## Quick Setup: Your EC2 SSH Adventure Kit

Here's your quick guide to setting up:

- **IAM Role Setup:** Equip your EC2 instance with an IAM role, armed with the AmazonSSMManagedInstanceCore policy. This is your golden ticket for SSM communication. Using an AWS Managed AMI? You're all set; it comes with this setup. Custom images? You'll need to manually install the SSM agent.
- **Security Groups?** Nah, We're Good! SSM StartSession bypasses the need for security group adjustments, offering a secure, invisible pathway to your instances
- **User Permissions:** The session initiator also needs clearance. Ensure your user account has the ssm:StartSession IAM action enabled.
- **SSH Key Flexibility:** An SSH key isn't mandatory but offers extra security. Have one? Great, use it. Don't? No sweat, you can upload one during the session.
- **AWS Session Manager Plugin:** Last but not least, install the AWS Session Manager Plugin on your local machine. This is your direct line to your EC2 instances through SSM StartSession.

With these essentials checked off, you're all set to explore the seamless world of EC2 access with SSM StartSession.

## Simple StartSession and its Quirks

Ready to dive in? Here's the magic spell (well, technically a command) to kickstart your session with your EC2 instance:

```sh
aws ssm start-session --target <instance-id>
```

Replace `<instance-id>` with the actual ID of your EC2 instance. This ID can be found in the AWS Management Console under the EC2 service.

This command doesn't use SSH; instead, it executes (`exec`) you into the EC2 instance as the `ssm-user`. So, while it's not traditional SSH, it gets the job done. Even the AWS console makes it easy—just navigate to EC2 and hit "connect."

However, remember, this method doesn't support port forwarding or other SSH tricks. It's straightforward, but sometimes that's all you need.

## Crafting Your SSH Config

First, pop open your trusty `~/.ssh/config` file and sprinkle in these magical lines amidst your other SSH settings:

```sshconfig
Host i-* mi-*
  User ec2-user
  IdentityFile ~/.ssh/please-dont-steal-me.pem
  ProxyCommand sh -c "aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p' --profile ${AWS_PROFILE:-default}"
```

With this configuration, you're just a simple command away from boarding your EC2 spaceship: `ssh <instance-id>`

Feeling adventurous? Switch your AWS profile on the fly with the AWS_PROFILE environment variable, or go rogue and hardcode your values for a profile that's unforgettable. How about naming it something secure & you'd never forget, like `Host production-ec2-do-it-at-your-own-risk`?

```sshconfig
Host production-ec2-do-it-at-your-own-risk
  HostName <instance-id>
  User ec2-user
  IdentityFile ~/.ssh/please-dont-steal-me.pem
  ProxyCommand sh -c "aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p' --profile production"
```

Now, you're ready to blast off with: `ssh production-ec2-do-it-at-your-own-risk`

Pay attention to the `--document-name AWS-StartSSHSession` part; it's crucial for establishing an SSH session with AWS Session Manager.

## Seamless Access and Comprehensive Auditing: NATs, VPC Endpoints, and SSM Logs

**NAT? We Got This (But VPC Endpoints Are Cooler):** Public NATs connect your EC2 instances to the internet without public IP addresses. However, AWS SSM VPC Endpoints provide a more secure and efficient way to access your VPC directly, without exposing instances to the internet.

**Big Brother is Watching (Your Session, Not You - Probably):** AWS System Manager logs your sessions in CloudWatch - perfect for audit trails.

![Jeff Bezos as Big Brother](/blog/big-brother.jpg)

Pic credit: [pinterest](https://in.pinterest.com/pin/706220785300242025/)