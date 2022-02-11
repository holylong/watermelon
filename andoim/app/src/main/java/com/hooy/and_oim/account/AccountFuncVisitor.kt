package com.hooy.and_oim.account

import androidx.annotation.IdRes
import androidx.fragment.app.FragmentManager
import com.hooy.and_oim.account.fragment.LoginFragment

/**
 * Created by alvince on 2021/9/27
 *
 * @author alvince.zy@gmail.com
 */
object AccountFuncVisitor {

    private const val LOGIN_PAGE_TAG = "com.hooy.and_oim.account.TAG_LOGIN_PAGE"

    fun login(fm: FragmentManager, @IdRes containerId: Int) {
        fm.findFragmentByTag(LOGIN_PAGE_TAG)
            ?.also {
                if (it.isVisible) {
                    return@also
                }
                fm.beginTransaction()
                    .show(it)
                    .commit()
            }
            ?: LoginFragment().also {
                fm.beginTransaction()
                    .addToBackStack("login")
                    .add(containerId, it, LOGIN_PAGE_TAG)
                    .show(it)
                    .commit()
            }
    }
}
