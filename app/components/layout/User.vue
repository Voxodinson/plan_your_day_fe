<template>
    <UDropdownMenu
        :items="items"
        :popper="{
            placement: 'bottom-start'
        }"
        :ui="{
            content: 'min-w-[200px]'
        }">
        <div
            class="bg-white flex gap-x-2 border-[1px] p-0.5 border-gray-200 rounded-full overflow-hidden">
            <UAvatar
                src="https://i.pinimg.com/736x/f6/61/ea/f661ea61616909838a9fbfeda0d2ea14.jpg"
                alt="user"
                size="md"
                class="w-[40px] h-[40px]"/>
        </div>
    </UDropdownMenu>
</template>

<script setup lang="ts">
import {
    storeToRefs
} from 'pinia';
import {
    useAuthStore
} from '@/store/auth';
import {
    Confirm
} from "@/utils/dialog";
import {
    type Router,
    useRouter
} from "vue-router";

/**
 * Begin::Declare variable section
 */
const {
    authenticated,
    username 
} = storeToRefs(useAuthStore());
const { 
    logUserOut 
} = useAuthStore();
const router: Router = useRouter();
const items: Ref<any[][]> = computed(() => [
    [
        {
            label: (username.value as string) || 'Username',
            class: 'justify-start pb-3 hover:bg-transparent',
            avatar: {
                src: 'https://i.pinimg.com/736x/f6/61/ea/f661ea61616909838a9fbfeda0d2ea14.jpg',
                size: 'lg'
            }
        },
        {
            label: 'Help',
            icon: "material-symbols:help-outline",
            class: 'text-black font-medium',
            to: '/settings/help'
        },
        {
            label: 'Setting',
            icon: "material-symbols:settings-outline-rounded",
            class: 'text-black font-medium',
            to: '/settings/setting'
        },
    ],
    [
        {
            label: 'Logout',
            icon: "material-symbols:logout-rounded",
            class: 'text-black font-medium',
            click: (): void => {
                logout();
            }
        }
    ]
]);
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const logout = (): void => {
    Confirm('Do you want to log out now?', (): void => {
        logUserOut();
        router.push('/signin_choose');
    });
}

const getUsername = (): void => {
    username.value = username.value || localStorage.getItem('username') as string;
}

/**
 * End::Some logical in this component
 */

onMounted(async (): Promise<void> => {
    getUsername();
});
</script>