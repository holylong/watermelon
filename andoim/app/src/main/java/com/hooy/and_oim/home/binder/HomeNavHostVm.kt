package com.hooy.and_oim.home.binder

import androidx.databinding.BaseObservable
import androidx.databinding.Bindable
import cn.alvince.zanpakuto.databinding.property.nullableField
import com.hooy.and_oim.BR

/**
 * Created by alvince on 2021/9/27
 *
 * @author alvince.zy@gmail.com
 */
class HomeNavHostVm : BaseObservable() {

    @get:Bindable
    var navItems: List<HomeNavItemVm>? by nullableField(BR.navItems)
}
