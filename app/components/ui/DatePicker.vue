<template>
    <div 
        class="space-y-2">
        <UCalendar 
            v-model="selected_date" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarDate } from '@internationalized/date'
import type { PropType } from 'vue'

// Props: allow parent to bind v-model
const props = defineProps({
    modelValue: {
        type: Object as PropType<CalendarDate | null>,
        default: null
    }
})

const emit = defineEmits(['update:modelValue', 'update:formatted'])

// Local state
const selected_date = ref<CalendarDate | any>(
    props.modelValue ?? new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
)

// Watch selectedDate and emit to parent
watch(selected_date, (val) => {
    emit('update:modelValue', val)
    emit('update:formatted', formattedDate.value)
});

// Month names
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

// Formatted string
const formattedDate: any = computed(() => {
    const d = selected_date.value
    return `${d.day} - ${monthNames[d.month - 1]} - ${d.year}`
});
</script>