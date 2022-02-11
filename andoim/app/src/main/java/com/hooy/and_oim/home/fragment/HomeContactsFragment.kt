package com.hooy.and_oim.home.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import cn.alvince.zanpakuto.databinding.FragmentBinding
import cn.alvince.zanpakuto.databinding.FragmentBindingHolder
import com.hooy.and_oim.R
import com.hooy.and_oim.databinding.MainHomeContactsFragmentBinding

/**
 * Created by alvince on 2021/9/27
 *
 * @author alvince.zy@gmail.com
 */
class HomeContactsFragment : Fragment(), FragmentBindingHolder<MainHomeContactsFragmentBinding> by FragmentBinding(R.layout.main_home_contacts_fragment) {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View =
        inflate(inflater, container) {

        }
}
