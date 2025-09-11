<template>
    <div
        class="w-[22%] h-full bg-white dark:bg-slate-800 border-l-[1px] border-gray-200">
        <div 
            class="flex h-[60px] border-b-[1px] border-gray-200 px-4 items-center justify-end gap-2 w-full">
            <UButton
                variant="ghost"
                size="sm"
                class="border-none hover:bg-white dark:hover:bg-slate-800 cursor-pointer dark:text-white text-gray-700">
                <UIcon
                    name="i-lucide-search"
                    class="w-6 h-6 hover:scale-110 transition"/>
            </UButton> 
            <UButton
                variant="ghost"
                size="sm"
                class="border-none hover:bg-white dark:hover:bg-slate-800 cursor-pointer dark:text-white text-gray-700"
                @click="() => {
                    toggleMode();
                }">
                <UIcon
                    :name="modes.icon"
                    class="w-6 h-6 hover:scale-110 transition"/>
            </UButton> 
            <User/>
        </div>
    </div>
</template>

<script setup lang="ts"> 
/**
 * Begin::Modules import setion
 */
import { User } from '.';
/**
 * End::Modules import section
 */

/**
 * Begin::Image import section
 */

/**
 * End::Image import section
 */

/**
 * Begin::Set event trigger
 */

/**
 * End::Set event trigger 
 */

/**
 * Begin::Declare variable section
 */
const isDarkMode: Ref<boolean> = ref<boolean>(false);

const modes = ref({
    mode: 'Dark Mode',
    icon: 'material-symbols:dark-mode-outline-rounded'
})

/**
 * End::Declare variable section
 */

/**
 * Begin::logical section
 */
const toggleMode = (): void => {
    isDarkMode.value = !isDarkMode.value;

    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');

        modes.value.mode = 'Light Mode';
        modes.value.icon = 'line-md:moon-alt-to-sunny-outline-loop-transition';

        localStorage.setItem('theme_color', 'true');
    } else {
        document.documentElement.classList.remove('dark');

        modes.value.mode = 'Dark Mode';
        modes.value.icon = 'line-md:sunny-outline-to-moon-loop-transition';

        localStorage.setItem('theme_color', 'false');
    }
};

onMounted((): void => {
    const savedMode: string | null = localStorage.getItem('theme_color');

    if (savedMode === 'true') {
        isDarkMode.value = true;

        document.documentElement.classList.add('dark');

        modes.value.mode = 'Light Mode';
        modes.value.icon = 'line-md:moon-alt-to-sunny-outline-loop-transition';
    } else {
        isDarkMode.value = false;
        
        document.documentElement.classList.remove('dark');

        modes.value.mode = 'Dark Mode';
        modes.value.icon = 'line-md:sunny-outline-to-moon-loop-transition';
    }
});
/**
 * End::logical section
 */

</script>