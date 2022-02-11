package com.hooy.and_oim.home.viewmodel

import android.app.Application
import androidx.databinding.ViewDataBinding
import com.hooy.and_oim.app.arch.AppViewModel
import com.hooy.and_oim.app.binding.BRW
import com.hooy.and_oim.home.binder.HomeNavHostVm

/**
 * Created by alvince on 2021/9/27
 *
 * @author alvince.zy@gmail.com
 */
class MainHostViewModel(application: Application) : AppViewModel(application) {

    private val binder = HomeNavHostVm()

    override fun bindView(binding: ViewDataBinding) {
        super.bindView(binding)
        binding.setVariable(BRW.binder, binder)
    }
}
