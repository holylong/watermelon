package com.hooy.and_oim.account.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import cn.alvince.zanpakuto.databinding.FragmentBinding
import cn.alvince.zanpakuto.databinding.FragmentBindingHolder
import cn.alvince.zanpakuto.lifecycle.appViewModel
import com.hooy.and_oim.R
import com.hooy.and_oim.account.viewmodel.LoginViewModel
import com.hooy.and_oim.databinding.AccountLoginFragmentBinding

/**
 * Created by alvince on 2021/9/27
 *
 * @author alvince.zy@gmail.com
 */
class LoginFragment : Fragment(), FragmentBindingHolder<AccountLoginFragmentBinding> by FragmentBinding(R.layout.account_login_fragment) {

    private val viewModel: LoginViewModel by appViewModel()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View =
        inflate(inflater, container) {

        }
}
