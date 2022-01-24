cmake_minimum_required(VERSION 3.10)

project(watermelon)

# add_subdirectory()

file(GLOB watermelon_SRC ${CMAKE_CURRENT_SOURCE_DIR}/src/hello.cc)

add_library(watermelon SHARED ${watermelon_SRC})

target_link_libraries(watermelon PRIVATE sfml-graphics)