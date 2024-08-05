<script setup lang="ts">
import {ref, watch} from "vue";
import {useMainStore} from "@/stores/main";
import type {AnyObject} from "../../../../env";
import {getLoginStatus, getUserDetail, getUserInfo, logout, signIn} from "@/service";
import {onClickOutside} from "@vueuse/core";
import {useRouter} from "vue-router";
import {UserProfile} from "@vicons/carbon";
import {ArrowForwardIosRound, ExitToAppRound} from "@vicons/material";
import {Moon, SunnySharp} from "@vicons/ionicons5";

let mainStore = useMainStore();
const userDetail = ref<AnyObject>();
const showUserPopover = ref(false);
const popoverContainerRef = ref();
const router = useRouter();
const signBtnLoading = ref(false);


watch(() => mainStore.isLogin, value => {
  if (value) {
    getUserProfile();
  }
});

onClickOutside(popoverContainerRef, (event: MouseEvent) => {
  let target = event.target as HTMLElement;
  if (!target.classList.contains('trigger')) {
    showUserPopover.value = false;
  }
});

const getUserProfile = () => {
  if (mainStore.userProfile?.userId) {
    getUserDetailInfo(mainStore.userProfile.profile.userId);
  } else {
    getUserInfo().then(res => getUserDetailInfo(res.data.profile.userId));
  }
};

const getUserDetailInfo = (uid: string) => {
  getUserDetail(uid).then((res) => {
    if (res?.data?.code === 200) {
      mainStore.userProfile = res.data;
      localStorage.userProfile = JSON.stringify(res.data);
      userDetail.value = res.data;
    }
  });
};

const checkLoginStatus = () => {
  getLoginStatus().then(res => {
    if (res.data?.data?.code === 200) {
      if (!res.data.data.account) {
        window.$message.warning('登录状态过期,请重新登录');
        mainStore.userProfile = {};
        localStorage.clear();
        mainStore.isLogin = false;
      }
    }
  });
};

const handlePositiveClick = () => {
  window.$message.loading('退出登录中...', {duration: 0});
  logout().then(res => {
    if (res.data.code === 200) {
      mainStore.isLogin = false;
      mainStore.userProfile = {};
      localStorage.isLogin = false;
      localStorage.clear();
      mainStore.removeAllLikeList();
      window.$message.destroyAll();
      window.$message.success('退出登录成功!');
    }
  });
};

const handleInfoEditClick = () => {
  showUserPopover.value = false;
  router.push('/userInfoEdit');
};

const handleSignInClick = () => {
  signBtnLoading.value = true;
  signIn().then(() => {
    if (userDetail.value) {
      signBtnLoading.value = false;
      userDetail.value.pcSign = true;
      window.$message.success('签到成功!');
    }
  });
};

const handleThemeSwitchUpdateChange = () => {
  mainStore.toggleTheme();
};

const backToDiscovery = () => {
  router.push('/discovery');
};

if (mainStore.isLogin) {
  getUserProfile();
  checkLoginStatus();
}
</script>

<template>
<n-layout-header bordered class="flex justify-between items-center px-4 h-14 sm:px-3">
  <div>
    <span @click="backToDiscovery">奇妙音乐屋！</span>
    <layout-header-search/>
  </div>
  <div>
    <div v-if="mainStore.isLogin">
      <div v-if="mainStore.userProfile">
        <n-avatar round :size="30" :src="mainStore.userProfile?.profile?.avatarUrl"/>
        <n-popover :show="showUserPopover" trigger="click" display-directive="show">
          <template #trigger>
            <p @click="() => (userDetail && (showUserPopover = !showUserPopover))">{{ mainStore.userProfile?.profile?.nickName }}</p>
          </template>
          <div ref="popoverContainerRef">
            <div>
              <div>
                <p>{{ mainStore.userProfile?.profile.eventCount }}</p>
                动态
              </div>
              <div>
                <p>{{ mainStore.userProfile?.profile?.follows }}</p>
                关注
              </div>
              <div>
                <p>{{ mainStore.userProfile?.profile?.followeds }}</p>
                粉丝
              </div>
            </div>
            <div>
              <n-button :loading="signBtnLoading" :disabled="mainStore.userProfile.pcSign" round @click="handleSignInClick"> {{ mainStore.userProfile.pcSign ? '已签到' : '签到' }} </n-button>
            </div>
            <div>
              <div>
                <div>
                  <n-icon :size="20" :component="UserProfile"/>
                  <span>个人信息设置</span>
                </div>
                <n-icon :component="ArrowForwardIosRound"/>
              </div>
            </div>
            <div>
              <n-popconfirm @positive-click="handlePositiveClick">
                <template #trigger>
                  <div>
                    <div>
                      <n-icon :size="20" :component="ExitToAppRound"/>
                      <span>退出登录</span>
                    </div>
                    <n-icon :component="ArrowForwardIosRound"/>
                  </div>
                </template>
                确认退出登录吗?
              </n-popconfirm>
            </div>
          </div>
        </n-popover>
      </div>
      <div v-else>
        <n-skeleton round/>
        <n-skeleton text/>
      </div>
    </div>
    <div>
      <n-switch :value="mainStore.isActiveDarkTheme" size="large" :on-update:value="handleThemeSwitchUpdateChange">
        <template #checked-icon>
          <n-icon :component="Moon"/>
        </template>
        <template #unchecked-icon>
          <n-icon :component="SunnySharp"/>
        </template>
      </n-switch>
    </div>
  </div>
</n-layout-header>
</template>

<style scoped>

</style>