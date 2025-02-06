#!/bin/zsh

base-down() {
  if [ ! -d ${STACK_DIR} ]; then
    echo "Error: Directory ${STACK_DIR} does not exist."
    return 1
  fi

  cd ${STACK_DIR} || return 1

  echo "Running Docker Compose in $(pwd)..."
  docker compose down
}

base-up() {
  if [ ! -d ${STACK_DIR} ]; then
    echo "Error: Directory ${STACK_DIR} does not exist."
    return 1
  fi

  cd ${STACK_DIR} || return 1

  echo "Running Docker Compose in $(pwd)..."
  docker compose up --remove-orphans -d
}

base-build() {
  if [ ! -d ${STACK_DIR} ]; then
    echo "Error: Directory ${STACK_DIR} does not exist."
    return 1
  fi

  cd ${STACK_DIR} || return 1

  echo "Cleaning up the house in $(pwd)..."
  docker compose down
  docker system prune -af

  echo "Building your stack please have a sit and grab a beer..."
  docker compose build --no-cache --with-dependencies
}
 
sh-base() {
  local container_name=""

  echo "Shell into $container_name"
  docker exec -it ${container_name} /bin/bash
}

sh-elavon() {
  local container_name=""

  echo "Shell into $container_name"
  docker exec -it ${container_name} /bin/bash
}