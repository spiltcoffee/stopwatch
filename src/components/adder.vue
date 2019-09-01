<template>
  <div class="flex">
    <div
      class="m-2 mt-0 w-6 h-6 rounded hover:bg-gray-100 hover:shadow-md text-center text-green-700 hover:text-green-600 transition"
      @click="$emit('add')"
    >
      <i class="fas fa-plus" />
    </div>
    <div
      class="m-2 mt-0 w-6 h-6 rounded hover:bg-gray-100 hover:shadow-md text-center text-red-700 hover:text-red-700"
      @click="$emit('remove')"
    >
      <i class="fas fa-minus" />
    </div>
  </div>
</template>