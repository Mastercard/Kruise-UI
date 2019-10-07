# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by the Kruise [code of conduct].

[code of conduct]: https://github.com/cncf/foundation/blob/master/code-of-conduct.md

Fork, then clone the repo:

    git clone git@github.com:your-username/kruise-deploy-wizard.git

Set up your machine:

* Docker

Rather than setting up a Node environment locally, we use Docker for building
and running the code in development.

Build the latest docker image:

```
make build
```

Run the server:

```
make run
```

Get a shell into the latest build image:

```
make shell
```

Make sure the tests pass:

```
make test
```

Make your change. Add tests for your change. Make the tests pass:

```
make test
```

Push to your fork and [submit a pull request][pr].

[pr]: https://github.com/kruise-deploy-wizard/compare/

At this point you're waiting on us. We like to at least comment on pull requests
within three business days (and, typically, one business day). We may suggest
some changes or improvements or alternatives.

Some things that will increase the chance that your pull request is accepted:

* Write tests.
* Follow good [golang style][style]
* Write a [good commit message][commit].

[style]: https://golang.org/doc/effective_go.html
[commit]: https://github.com/erlang/otp/wiki/writing-good-commit-messages
