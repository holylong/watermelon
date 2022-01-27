set PATH=D:\Android\Sdk\ndk\21.4.7075529;%PATH%
set PATH=%cd%\bin;%PATH%
set ANDROID_NDK=D:\Android\Sdk\ndk\21.4.7075529

@REM mkdir build-android-aarch64
@REM pushd build-android-aarch64

cmake  -DCMAKE_SYSTEM_NAME=Android -DCMAKE_ANDROID_NDK=D:/Android/Sdk/ndk-bundle -DCMAKE_ANDROID_ARCH_ABI=armeabi-v7a -DCMAKE_ANDROID_STL_TYPE=c++_static -DCMAKE_BUILD_TYPE=Debug ^
-G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE=%ANDROID_NDK%/build/cmake/android.toolchain.cmake ^
-DANDROID_PLATFORM=android-24 ^
-DCMAKE_INSTALL_PREFIX=%cd%/android_install  ../..
cmake --build .
@REM -DANDROID_ABI=arm64-v8a
popd
