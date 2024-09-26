import { computed, type CSSProperties } from 'vue';
import { useThemeVars } from 'naive-ui';

export default function useThemeStyle(otherStyle?: CSSProperties) {
  const themeVars = useThemeVars();
  const stripedClass = computed(() => {
    return (index: number) => {
      let classes = '';
      if (index % 2 === 0) {
        classes =
          'bg-white hover:bg-gray-100 dark:bg-black/50 dark:hover:bg-gray-200/10';
      } else {
        classes =
          'bg-gray-50 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-200/10';
      }
      return classes;
    };
  });
  return { stripedClass, themeVars };
}
