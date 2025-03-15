FROM ruby:3.2-alpine AS builder
RUN apk add --no-cache build-base && \
    gem install --no-document asciidoctor asciidoctor-pdf rouge pygments.rb coderay rghost
FROM ruby:3.2-alpine
RUN apk add --no-cache ttf-liberation font-noto font-noto-cjk tzdata
COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
WORKDIR /documents
ENTRYPOINT ["asciidoctor-pdf"]
CMD ["--help"]
