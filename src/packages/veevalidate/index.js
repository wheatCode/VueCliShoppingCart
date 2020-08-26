import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW'
});

Vue.use(VeeValidate, {
  events: 'input|blur',
  useConstraintAttrs: false, //驗證數字為空時,會順便驗證小數點,此方法可以關掉驗證小數點
  i18n,
  dictionary: {
    zhTW
  }
});

export default i18n;
