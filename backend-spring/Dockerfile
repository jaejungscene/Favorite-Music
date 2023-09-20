FROM openjdk:18
ARG JAR_FILE=./target/myspring*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/app.jar" ]