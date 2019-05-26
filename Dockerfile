FROM ruby:2.5

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get update -qqy && apt-get -qqyy install nodejs
RUN mkdir -p /commint_loader
WORKDIR /commit_loader
COPY Gemfile Gemfile.lock ./
COPY . /commit_loader
RUN bundle install

EXPOSE 3000
CMD bundle exec rails s -b '0.0.0.0' -p 3000
