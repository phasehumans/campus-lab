### Judge0 Setup

- ref : [Judge0 Documentation](https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure)
- wsl
    - wsl --install
    - sudo apt update && sudo apt upgrade -y
- docker and docker compose
    - sudo apt update && sudo apt install -y docker
    - sudo apt install -y docker-compose
- download and unzip judge0
    - wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
    - unzip judge0-v1.13.1.zip
- judge0 config
    - cd judge0-v1.13.1/
    - nano judge0.conf
    - set redis and postgres password
    - docker-compose up -d db redis
    - docker-compose up -d <<<<<
    - docker ps
    - http://localhost:2358/docs
- postgres for campus-lab
    - docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres















-----------------





Good, this is the mindset of a serious engineer — not just “make it work”, but “make it stable”.

Let’s talk about what to do if a similar error happens again, so you never get stuck.

The types of errors you’ve seen so far
Error Type	Root Cause	Fix
Module not found	Wrong JS import paths	Fix file structure
Prisma client engine error	Wrong Prisma engine type	Switch to binary
Docker network recreation errors	Docker daemon networking mismatch	Reset Docker networks
docker-credential-desktop.exe error	WSL using Windows Docker auth helper	Remove credsStore

So basically:

90% of errors = config mismatch

Not logic issues

If Judge0 fails again — use this recovery flow

This is your standard reset procedure.

You don’t need to guess each time.

Step 1 — Stop everything
cd ~/judge0-v1.13.1
docker-compose down

Step 2 — Reset Docker networking
sudo systemctl stop docker
sudo rm -rf /var/lib/docker/network
sudo systemctl start docker

Step 3 — Reset Docker credential config
nano ~/.docker/config.json


Ensure it looks like:

{
  "auths": {}
}


(No credsStore)

Step 4 — Restart Judge0
docker-compose up -d db redis
docker-compose up -d

Why this always works

Because this resets:

Docker’s network state

Docker’s credential layer

Judge0’s container lifecycle

It gives you a fresh deterministic runtime, which is the only way to run infra cleanly.

What you should do now

Let the current download complete.

Then run:

docker ps


If anything crashes, send the output here —
We’ll fix it systematically.

You're building real infra now.