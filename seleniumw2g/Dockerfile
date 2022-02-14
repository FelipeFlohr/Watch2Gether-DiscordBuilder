FROM maven:3.8.4-openjdk-17-slim AS build
COPY pom.xml /home/app/
COPY src /home/app/src
RUN mvn -f home/app/pom.xml package

FROM openjdk:17-alpine
COPY --from=build /home/app/target/seleniumw2g-1.0.0.jar usr/local/lib/selenium.jar
RUN apk add --no-cache nss
RUN apk add firefox
EXPOSE 8080
CMD [ "java", "-jar", "/usr/local/lib/selenium.jar" ]