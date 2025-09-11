<template>
    <div 
        class="relative transition-all h-full bg-white dark:bg-slate-800 duration-200 ease-in-out border-r-[1px] border-gray-200"
        :class="{
            'w-[22%]': !expand,
            'w-[57px]': expand
        }">
        <div 
            class="w-full h-[60px] flex items-center relative border-b-[1px] border-gray-200"
            :class="{
              'justify-between' : !expand,
              'justify-center' : expand
            }">
            <div
                :class="{
                    'hidden': expand,
                    'block ml-2': !expand
                }">
                <img 
                    :src="LogoBlack" 
                    alt="logo"
                    class="w-[150px]">
            </div>
            <UIcon 
                name="f7:sidebar-left"
                class="w-5 h-5 opacity-60 text-gray-700 hover:opacity-100 hover:text-black hover:scale-110 transition-all mr-4 duration-100 ease-in-out"
                :class="{
                  'ml-1.5': expand
                }"
                @click="toggleSidebar(!expand)"/>
        </div>
        <div class="h-[calc(100vh-95px)] p-4 overflow-auto">
            <Section
                label="Tasks"/>
            <div 
                class="w-full pl-3">
                <Menu
                    icon="uis:calender"
                    title="Today"
                    :len_show="true"
                    len_num="10"
                    path="/"
                    class-name="pl-3"
                    :class-title="!expand ? '' : 'hidden'"/>
                <Menu
                    icon="material-symbols:calendar-month-rounded"
                    title="Calender"
                    :len_show="true"
                    len_num="10"
                    path="/tasks/calender"
                    class-name="pl-3"
                    :class-title="!expand ? '' : 'hidden'"/>
                <Menu
                    icon="ri:sticky-note-fill"
                    title="Sticky Wall"
                    path="/tasks/sticky_wall"
                    :len_show="false"
                    len_num="10"
                    class-name="pl-3"
                    :class-title="!expand ? '' : 'hidden'"/>
            </div>
            <AccordionMenu
                title="Lists"
                :index="0"
                :if_add_new="false"
                :active-index="activeIndex"
                :class-title="!expand ? '' : 'hidden'"
                class="mt-6"
                @toggle-accordion="toggleAccordion">
                <div 
                    class="w-full pl-3">
                    <Menu
                        icon="icon-park-solid:people"
                        title="Personal"
                        :len_show="true"
                        len_num="6"
                        path="/lists/personal"
                        class-name=""
                        :class-title="!expand ? '' : 'hidden'"/>
                    <Menu
                        icon="material-symbols:laptop-chromebook-outline-rounded"
                        title="Work / Study"
                        path="/lists/work_and_study"
                        :len_show="true"
                        len_num="9"
                        class-name=""
                        :class-title="!expand ? '' : 'hidden'"/>
                    <Menu
                        icon="famicons:fitness"
                        title="Health / Fitness"
                        :len_show="true"
                        len_num="0"
                        path="/lists/health_and_fitness"
                        class-name=""
                        :class-title="!expand ? '' : 'hidden'"/>
                    <Menu
                        icon="ri:brain-2-fill"
                        title="Learning / Growth"
                        path="/lists/learning_and_growth"
                        :len_show="true"
                        len_num="0"
                        class-name="mb-6"
                        :class-title="!expand ? '' : 'hidden'"/>
                </div>
            </AccordionMenu>
            <AccordionMenu
                title="Projects"
                :index="1"
                :if_add_new="true"
                :active-index="activeIndex"
                :class-title="!expand ? '' : 'hidden'"
                class=""
                @toggle-accordion="toggleAccordion">
                <div 
                    class="w-full pl-3">
                    
                </div>
            </AccordionMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * Begin::Modules import setion
 */
import {
    type Router,
    useRouter
} from "vue-router";
import {
    Menu,
    Section
} from '@/components/layout';
import {
    AccordionMenu
} from "@/components/ui/";
import {
    useAuthStore
} from '@/store/auth';
import {
    Confirm
} from "@/utils/dialog";
/**
 * End::Modules import section
 */

/**
 * Begin::Image import section
 */
import { 
    LogoBlack, 
    LogoWhite 
} from '~/assets/images/logo';
/**
 * End::Image import section
 */


/**
 * Begin::Set event trigger to parent component
 */

defineEmits<{
    (event: 'setTitle', title: string): void;
    (event: 'expand', state: boolean): void;
}>();
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variable section
 */
const activeIndex: Ref<number> = ref<number>(-1);
const expand: Ref<boolean> = ref<boolean>(false);
const search: Ref<boolean> = ref<boolean>(false);
const { 
    logUserOut 
} = useAuthStore();
const router: Router = useRouter();
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const toggleAccordion = (index: number): void => {
    activeIndex.value = activeIndex.value === index ? -1 : index;
};

const toggleSidebar = (value: boolean): void => {
    if(search.value === true){
        search.value = false as boolean;
    }
    expand.value = value as boolean;
}

const logout = (): void => {
    Confirm('Do you want to log out now?', (): void => {
        logUserOut();
        router.push('/choose_signin');
    });
}
/**
 * End::Some logical in this component
 */
</script>