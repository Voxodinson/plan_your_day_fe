<template>
    <div
        class="w-full h-fit">
        <div 
            class="w-full h-[60px] bg-gray-100 shadow_md sticky top-0 left-0 flex items-center justify-start p-3">
            <div 
                class="w-full flex justify-between">
                <UButton
                    icon="material-symbols:chevron-left-rounded"
                    color="neutral"
                    variant="outline"
                    :ui="{
                        leadingIcon: 'text-black'
                    }"/>
                <div 
                    class="w-fit flex items-center justify-center gap-3">
                     <h3
                        class="text-lg font-semibold items-center ">
                        {{ date_foramatted || 'Today' }}
                    </h3>
                    <UButton
                        icon="material-symbols:calendar-month"
                        color="neutral"
                        size="xs"
                        variant="outline"
                        class="rounded-sm"
                        :ui="{
                            leadingIcon: 'text-black'
                        }"
                        @click="toggle_date_modal()"/>
                    <UKbd
                        size="lg" 
                        value="10"
                        class="mt-0"/>
                </div>
                <UButton
                    icon="material-symbols:chevron-right-rounded"
                    color="neutral"
                    variant="outline"
                    :ui="{
                        leadingIcon: 'text-black'
                    }"/>
            </div>
        </div>
        <div 
            class="w-full h-fit p-3">
            <UButton
                icon="material-symbols:add-circle-outline-rounded"
                color="neutral"
                variant="ghost"
                size="lg"
                class="w-full flex items-center justify-center cursor-pointer border-[1px] bg-gray-100 border-gray-300">
                Add Task
            </UButton>
            <div 
                class="w-full bg-gray-100 flex flex-col gap-3 p-3 rounded-md mt-6">
                <div class="w-full flex justify-between">
                    <h3
                        class=" font-semibold">
                        Tasks
                    </h3>
                    <UButton
                        :icon="show_select_task ? 'material-symbols:cancel-outline-rounded' : 'material-symbols:check-circle-outline-rounded'"
                        color="neutral"
                        size="xs"
                        variant="outline"
                        :ui="{
                            leadingIcon: 'text-black'
                        }"
                        @click="toggle_select_task"/>
                </div>
                <div 
                    v-for="(task, idx) in task_datas"
                    :key="idx"
                    class="w-full p-3 border-[1px] flex justify-between border-gray-200 hover:bg-white transition cursor-pointer rounded-md">
                    <div 
                        class="w-fit flex items-start gap-3">
                        <UCheckbox
                            v-if="show_select_task"
                            size="lg"
                            v-model="task.completed" />
                        <div 
                            class="flex flex-col items-start justify-start">
                            <p
                                class="text-[0.9rem] font-medium">
                                {{ task.name }}
                            </p>
                            <span
                                class="text-[0.7rem]">
                                {{ task.description }}
                            </span>
                            <div 
                                class="flex gap-3 items-center mt-3">
                                <div 
                                    v-if="task.due_date"
                                    class="flex items-center gap-1">
                                    <UIcon 
                                        name="tabler:calendar-due"
                                        class="w-4.5 h-4.5 text-gray-400"/>
                                    <span
                                        class="text-[0.7rem]">
                                        {{ task.due_date }}
                                    </span>
                                </div>
                                <USeparator 
                                    orientation="vertical" 
                                    class="h-4" />
                                <div
                                    class="flex items-center gap-1">
                                    <UKbd
                                        size="md" 
                                        :value="String(task.subtasks.length) || undefined"
                                        class="mt-0"/>
                                    <span
                                        class="text-[0.7rem]">
                                        {{ task.subtasks.length != 0 ? 'Subtasks' : 'No Subtask' }}
                                    </span>
                                </div>
                                <USeparator 
                                    orientation="vertical" 
                                    class="h-4" />
                                <div
                                    class="flex items-center gap-1">
                                    <UKbd
                                        size="md"
                                        variant="soft"
                                        class="mt-0 bg-red-500"/>
                                    <span
                                        class="text-[0.7rem]">
                                        {{ task.list }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div 
                        class="flex items-center gap-3">
                        <UIcon 
                            name="material-symbols:chevron-right-rounded"
                            class="w-6 h-6 text-gray-400 group-hover:text-gray-400 hover:scale-110 transition"/>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <UModal
        v-model:open="open_date_modal"
        title="Date Picker"
        description="">
        <template 
            #body>
            <div 
                class="bg-white w-full">
                <DatePicker 
                    v-model="date"
                    @update:formatted="date_foramatted = $event" />
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts"> 
/**
 * Begin::Modules import setion
 */
import { ref, type Ref } from 'vue';
import { 
    DatePicker 
} from '~/components/ui';
import type { 
    Task, 
    Subtask 
} from '~/models/type';
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

const date: Ref<any> = ref<any>(null)
const date_foramatted: Ref<string | undefined> = ref<string | undefined>('');

const open_date_modal: Ref<boolean | any> = ref<boolean | any>(false);
const show_select_task: Ref<boolean | any> = ref<boolean | any>(false);

const task_datas: Ref<Task[]> = ref<Task[]>([
    {
        id: 120948,
        name: 'Renew driver license',
        description: 'At Ministry',
        date: '10 - September - 2025',
        due_date: '12 - September - 2025',
        list: 'Personal',
        completed: true,
        subtasks: [
            { id: 1, name: 'Prepare documents', completed: false },
            { id: 2, name: 'Pay fees', completed: false }
        ]
    },
    {
        id: 120949,
        name: 'Grocery shopping',
        description: '',
        date: '11 - September - 2025',
        due_date: '12 - September - 2025',
        list: 'Personal',
        completed: false,
        subtasks: [
        ]
    }
]);
/**
 * End::Declare variable section
 */

/**
 * Begin::logical section
 */
const toggle_date_modal = (): void => {
    open_date_modal.value = !open_date_modal.value as boolean;
}

const toggle_select_task = (): void => {
    show_select_task.value = !show_select_task.value as boolean;
}
/**
 * End::logical section
 */

</script>