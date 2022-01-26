cmake_minimum_required(VERSION 3.10)

project(greatwall)

add_subdirectory(3rdparty/SFML)

file(GLOB xonix_SRC ${CMAKE_CURRENT_SOURCE_DIR}/src/xonix.cpp)
file(GLOB watermelon_SRC ${CMAKE_CURRENT_SOURCE_DIR}/executor/src/hello.cc)


add_executable(xonix ${xonix_SRC})

target_link_libraries(xonix PRIVATE sfml-graphics)

add_library(watermelon SHARED ${watermelon_SRC})
# target_compile_definitions(watermelon USE_JNI)
add_definitions(-DUSB_JNI)
target_link_libraries(watermelon PRIVATE sfml-graphics sfml-audio sfml-window sfml-system sfml-main sfml-network sfml-activity)

SET(EXECUTABLE_OUTPUT_PATH ${CMAKE_CURRENT_BINARY_DIR}/bin)
SET(LIBRARY_OUTPUT_PATH ${CMAKE_CURRENT_BINARY_DIR}/bin)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_BINARY_DIR}/bin)    
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_BINARY_DIR}/bin)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY_DEBUG ${PROJECT_SOURCE_DIR}/bin)    
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY_RELEASE ${PROJECT_SOURCE_DIR}/bin) 

SET(CMAKE_INSTALL_PREFIX ${CMAKE_CURRENT_BINARY_DIR}/install)