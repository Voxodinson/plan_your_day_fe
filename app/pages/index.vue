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
                @click="toggle_create_task"
                class="w-full flex items-center justify-center cursor-pointer border-[1px] bg-white border-gray-300">
                Add Task
            </UButton>
            <div 
                class="w-full bg-gray-100 flex flex-col gap-3 p-3 rounded-md mt-3">
                <div class="w-full flex justify-between">
                    <h3
                        class=" font-semibold">
                        Tasks
                    </h3>
                    <UButton
                        :icon="show_select_task ? 'material-symbols:cancel-outline-rounded' : 'material-symbols:check-circle-outline-rounded'"
                        size="sm"
                        variant="outline"
                        color="neutral"
                        :label="show_select_task ? 'Cancel' : 'Select'"
                        :ui="{
                            leadingIcon: show_select_task ? 'text-red-500' : 'text-green-500'
                        }"
                        @click="toggle_select_task"/>
                </div>
                <div 
                    v-for="(task, idx) in task_datas"
                    :key="idx"
                    @click="() => {
                        toggle_edit_task(Number(task.id));
                    }"
                    class="w-full p-3 border-[1px] flex justify-between border-gray-200 bg-white hover:bg-gray-200 transition cursor-pointer rounded-md">
                    <div 
                        class="w-fit flex items-center gap-3">
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
                                    <UIcon
                                        :name="
                                            task.list.label === 'personal' ? 'icon-park-solid:people' :
                                            task.list.label === 'work / study' ? 'material-symbols:laptop-chromebook-outline-rounded' :
                                            task.list.label === 'health / fitness' ? 'famicons:fitness' :
                                            task.list.label === 'learning / growth' ? 'ri:brain-2-fill' :
                                            'material-symbols:task-outline'
                                        "
                                        class="w-4.5 h-4.5 text-gray-400"/>
                                    <span
                                        class="text-[0.7rem]">
                                        {{ task.list.label }}
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
                                        class=""
                                        :class="{
                                            'bg-red-500 ': task.priority.level === 'high',
                                            'bg-yellow-500 ': task.priority.level === 'medium',
                                            'bg-green-500 ': task.priority.level === 'low'
                                        }"/>
                                    <span
                                        class="text-[0.7rem]">
                                        {{ task.priority.label }}
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
        v-model:open="open_create_modal"
        title="Add New Task"
        description=""
        class="sm:w-full md:w-[900px] lg:w-[1000px]"
        :ui="{ 
            content: 'w-full sm:max-w-[95%] p-6' 
        }">
        <template #body>
            <div 
                class="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                    class="space-y-4">
                    <UFormField 
                        label="Task Name">
                        <UInput
                            v-model="new_task.name"
                            placeholder="Enter task name..."
                            class="w-full"
                            size="lg"/>
                    </UFormField>

                    <UFormField 
                        label="Description">
                        <UTextarea
                            v-model="new_task.description"
                            placeholder="Enter description..."
                            class="w-full"
                            :rows="4"/>
                    </UFormField>

                    <div 
                        class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <UFormField 
                            label="List">
                            <USelectMenu
                                v-model="new_task.list"
                                :items="ReuseData.lists"
                                class="w-full capitalize"
                                placeholder="Select list..."
                                size="lg"/>
                        </UFormField>

                        <UFormField label="Due Date">
                            <UInput
                            v-model="new_task.due_date"
                            type="date"
                            class="w-full"
                            size="lg"/>
                        </UFormField>
                    </div>
                </div>
                <div 
                    class="space-y-4">
                    <div 
                        class="flex justify-between items-center">
                        <h3 
                            class="font-bold text-lg text-gray-700">Subtasks</h3>
                        <UButton
                            :icon="add_subtask ? 'material-symbols:cancel-outline-rounded' : 'material-symbols:add-circle-outline-rounded'"
                            color="neutral"
                            variant="ghost"
                            size="md"
                            @click="add_subtask = !add_subtask">
                            {{ add_subtask ? 'Close' : 'Add Subtask' }}
                        </UButton>
                    </div>
                    <div 
                        v-if="add_subtask" 
                        class="flex gap-2">
                        <UInput
                            v-model="new_subtask"
                            placeholder="Subtask..."
                            class="flex-1"
                            size="md"/>
                        <UButton
                            icon="material-symbols:add-circle-outline-rounded"
                            label="Add"
                            size="md"
                            variant="soft"
                            color="info"
                            @click="addNewSubtask()"/>
                    </div>
                    <ul 
                        class="space-y-2 mt-2">
                        <li
                            v-if="!new_task.subtasks || new_task.subtasks.length === 0"
                            class="flex items-center gap-2 text-gray-400 italic">
                            <UIcon 
                                name="si:warning-duotone" 
                                class="w-5 h-5 text-gray-400" />
                            No subtasks added yet.
                        </li>
                        <li
                            v-for="subtask in new_task.subtasks"
                            :key="subtask.id"
                            class="flex items-center gap-2">
                            <input
                                type="checkbox"
                                v-model="subtask.completed"
                                class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"/>
                            <span 
                                :class="{ 'line-through text-gray-400': subtask.completed }">
                                {{ subtask.name }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <USeparator class="my-6" />
            <div class="flex justify-end gap-3">
                <UButton
                    icon="ic:baseline-cancel"
                    label="Cancel"
                    size="md"
                    variant="soft"
                    color="neutral"
                    @click="open_create_modal = false"/>
                <UButton
                    icon="ic:baseline-save-alt"
                    label="Create Task"
                    size="md"
                    variant="soft"
                    color="info"
                    @click="saveNewTask()"/>
            </div>
        </template>
    </UModal>

    <UModal
        v-model:open="open_edit_modal"
        aria-hidden="true"
        :title="modify_task.name || 'Task'"
        description="Test"
        class="sm:w-full md:w-[900px] lg:w-[1000px]"
        :ui="{
            content: 'w-full sm:max-w-[95%] p-6' 
        }">
        <template #body>
            <div 
                class="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                <div    
                    class="space-y-4">
                    <h3 
                        class="font-bold text-lg text-gray-700">Task Details</h3>

                    <UFormField label="Task name">
                        <UInput
                            v-model="modify_task.name"
                            placeholder="Task name..."
                            :ui="{ trailing: 'pe-1' }"
                            class="w-full"
                            size="lg"/>
                    </UFormField>

                    <UFormField label="Description">
                        <UTextarea
                            v-model="modify_task.description"
                            placeholder="Enter description..."
                            class="w-full"
                            :rows="12"/>
                    </UFormField>

                    <div 
                        class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <UFormField 
                            label="Lists">
                            <USelectMenu
                                v-model="modify_task.list"
                                :items="ReuseData.lists"
                                class="w-full capitalize"
                                placeholder="Select list..."
                                size="lg"/>
                        </UFormField>
                        <UFormField 
                            label="Due Date">
                            <UInput
                                v-model="modify_task.due_date"
                                type="date"
                                class="w-full"
                                size="lg"/>
                        </UFormField>
                    </div>
                </div>
                <div 
                    class="space-y-4">
                    <div class="flex justify-between items-center">
                        <h3 
                            class="font-bold text-lg text-gray-700">Subtasks</h3>
                        <UButton
                            :icon="add_subtask ? 'material-symbols:cancel-outline-rounded' : 'material-symbols:add-circle-outline-rounded'"
                            color="neutral"
                            variant="ghost"
                            size="md"
                            @click="add_subtask = !add_subtask">
                            {{ add_subtask ? 'Close' : 'Add Subtask' }}
                        </UButton>
                    </div>

                    <div
                        v-if="add_subtask" class="flex gap-2">
                        <UInput
                            v-model="new_subtask"
                            placeholder="Subtask..."
                            class="flex-1"
                            size="md"/>
                        <UButton
                            icon="material-symbols:add-circle-outline-rounded"
                            label="Add"
                            size="md"
                            variant="soft"
                            color="info"
                            @click="addNewSubtask()"/>
                    </div>
                    <ul class="space-y-2 mt-2">
                        <li
                            v-if="!modify_task.subtasks || modify_task.subtasks.length === 0"
                            class="flex items-center gap-2 text-gray-400 italic">
                            <UIcon 
                                name="si:warning-duotone" 
                                class="w-5 h-5 text-gray-400" />
                            No subtasks at the moment.
                        </li>
                        <li
                            v-for="subtask in modify_task.subtasks"
                            :key="subtask.id"
                            class="flex items-center gap-2">
                            <input
                            type="checkbox"
                            v-model="subtask.completed"
                            class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"/>
                            <span :class="{ 'line-through text-gray-400': subtask.completed }">
                                {{ subtask.name }}  
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <USeparator 
                class="my-6" />
            <div class="flex justify-end gap-3">
                <UButton
                    icon="material-symbols:delete-outline"
                    label="Delete Task"
                    size="md"
                    variant="soft"
                    color="error"
                    @click="() => {
                        open_edit_modal = Boolean(false);
                        Confirm('Are you sure to delete this task?', () => {
                            if(modify_task.id){
                                delete_task(modify_task.id);
                            }
                        });
                    }"/>
                <UButton
                    icon="ic:baseline-save-alt"
                    label="Save Changes"
                    size="md"
                    variant="soft"
                    color="info"
                    @click="() => {
                        update_task(modify_task)
                    }"/>
            </div>
        </template>
    </UModal>
    
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

    <Loading
        :loading="loading_payload"/>

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
import { 
    Loading 
} from '~/components/loading';
import { 
    ReuseData 
} from '~/contents';
import {
    Success, 
    Error,
    Confirm
} from '~/utils/dialog';
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

const loading_payload: Ref<boolean> = ref<boolean>(false);

const open_date_modal: Ref<boolean> = ref<boolean>(false);
const show_select_task: Ref<boolean> = ref<boolean>(false);
const open_edit_modal: Ref<boolean > = ref<boolean>(false);
const open_create_modal: Ref<boolean > = ref<boolean>(false);
const add_subtask: Ref<boolean > = ref<boolean>(false);

const modify_task: Ref<Task | any> = ref<Task | any>({});
const task_datas: Ref<Task[]> = ref<Task[]>([]);
/**
 * End::Declare variable section
 */

/**
 * Begin::logical section
 */
const new_subtask = ref('');
const new_task = reactive<any>({
    id: Date.now(),
    name: '',
    description: '',
    date: '',
    due_date: '',
    list: '',
    completed: false,
    priority: {
        label: 'Low Priority',
        level: 'low'
    },
    subtasks: []
});

// Add a subtask
const get_task_datas = (): void => {
    task_datas.value = JSON.parse(localStorage.getItem('task_datas') || '[]') as Task[];
};

const addNewSubtask = (): void => {
    if (!new_subtask.value) return;

    if (!Array.isArray(new_task.subtasks)) {
        new_task.subtasks = [];
    }
    new_task.subtasks.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: new_subtask.value,
        completed: false
    });
    new_subtask.value = '';
};

const saveNewTask = () => {
    try {
        loading_payload.value = true;

        if (!new_task.date) {
            const now = new Date();
            new_task.date = now.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }

        const tasks = JSON.parse(localStorage.getItem('task_datas') || '[]');
        new_task.id = Date.now();
        tasks.push({ ...new_task });
        localStorage.setItem('task_datas', JSON.stringify(tasks));

        new_task.name = '';
        new_task.description = '';
        new_task.date = '';
        new_task.due_date = '';
        new_task.list = '';
        new_task.completed = false;
        new_task.priority = { label: 'Low Priority', level: 'low' };
        new_task.subtasks = new_subtask.value;

    
        //clear subtask
        new_subtask.value = [] as any;
        get_task_datas();
        Success('Create successfully..!')
        open_create_modal.value = false;
    }catch (error: any){
        Error('Create failed..!');
    }finally{
        loading_payload.value = false
    }
};

// Delete a task by ID
const delete_task = (id: number) => {
    try {
        loading_payload.value = true;

        task_datas.value = task_datas.value.filter((task: Task) => task.id !== id);
        
        localStorage.setItem('task_datas', JSON.stringify(task_datas.value));
        Success('Deleted successfully..!');
    }catch (error: any){
        Error('Delete failed..!');
    }finally{
        loading_payload.value = false;
    }
};

// Update a task by ID
const update_task = (updatedTask: any) => {
    Confirm('Are you sure to update this task?', () => {
        try {
            loading_payload.value = true;

            task_datas.value = task_datas.value.map((task: Task) =>
                task.id === updatedTask.id ? { ...updatedTask } : task
            );
            localStorage.setItem('task_datas', JSON.stringify(task_datas.value));

            Success('Updated successfully..!');
        }catch (error: any){
            Error('Update failed..!');
        }finally{ 
            loading_payload.value = false;
        }
    })
};

const toggle_date_modal = (): void => {
    open_date_modal.value = !open_date_modal.value as boolean;
}

const toggle_select_task = (): void => {
    show_select_task.value = !show_select_task.value as boolean;
}


const toggle_edit_task = async (id?: number): Promise<void> => {
    try {
        loading_payload.value = true;
        await new Promise(resolve => setTimeout(resolve, 300));

        const task = task_datas.value.find(t => t.id === id);
        if (task) modify_task.value = { ...task };

        open_edit_modal.value = !open_edit_modal.value;
    } finally {
        loading_payload.value = false;
    }
};

const toggle_create_task = (): void => {
    open_create_modal.value = !open_create_modal.value as boolean;

}
/**
 * End::logical section
 */

onMounted((): void => {
    get_task_datas();
})
</script>