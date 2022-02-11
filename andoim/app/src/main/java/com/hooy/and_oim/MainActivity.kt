package com.hooy.and_oim

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import cn.alvince.zanpakuto.databinding.ActivityBinding
import cn.alvince.zanpakuto.databinding.ActivityBindingHolder
import com.hooy.and_oim.account.AccountFuncVisitor
import com.hooy.and_oim.account.AccountManager
import com.hooy.and_oim.databinding.MainActivityBinding
import com.hooy.and_oim.home.fragment.HomeHostFragment

class MainActivity : AppCompatActivity(), ActivityBindingHolder<MainActivityBinding> by ActivityBinding(R.layout.main_activity) {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        inflate {
            supportFragmentManager.beginTransaction()
                .add(R.id.fcv_container, HomeHostFragment())
                .commit()
        }
    }

    override fun onStart() {
        super.onStart()
        if (!AccountManager.logged) {
            AccountFuncVisitor.login(supportFragmentManager, R.id.fcv_container)
        }
    }
}
