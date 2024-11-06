FROM node:20
RUN apt install openssh-client git
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

CMD ["./bin/backend_dev.sh"]
