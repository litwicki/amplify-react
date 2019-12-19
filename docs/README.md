# Amplify / React

This is a scaffolding project to build [ReactJS](https://reactjs.org/) applications with [AWS Amplify](https://aws.amazon.com/amplify/).

## Get Started

The setup script will setup most of your environment, but you'll want to make sure you have an [AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) with at least a default profile setup for when you `amplify configure` your environment.

- [Create AWS Account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html)
- [Setup AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

## Setup

```Shell
npm run setup && npm start
```

Now that you've installed all the basics for the application, link it to the AWS account for provisioning resources.

```Shell
amplify configure
```

### Developing

This scaffolding project was built on top of [react-boilerplate](https://www.reactboilerplate.com/) which has [extensive documentation](react-boilerplate.md) on how to build, test, and manage the application code.

It's very likely this is tremendous overkill for your application, and that's okay.
