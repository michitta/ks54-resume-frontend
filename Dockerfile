FROM imbios/bun-node:latest-current-alpine
WORKDIR /app
COPY . /app
RUN bun i
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]