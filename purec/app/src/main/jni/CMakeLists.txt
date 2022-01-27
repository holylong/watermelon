cmake_minimum_required(VERSION 3.10)

project(purec)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

file(GLOB purec_SRC ${CMAKE_CURRENT_SOURCE_DIR}/src/main.cpp
        ${ANDROID_NDK}/sources/android/native_app_glue/android_native_app_glue.c)

add_library(purec SHARED ${purec_SRC})

message(WARNING ${ANDROID_NDK}/sources/android/native_app_glue)
target_include_directories(purec PRIVATE ${ANDROID_NDK}/sources/android/native_app_glue)
#target_link_libraries(purec PRIVATE android_native_app_glue)

target_link_libraries(purec PRIVATE log android EGL GLESv2)