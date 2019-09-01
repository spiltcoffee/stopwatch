<template>
  <div class="z-10 absolute top-0 right-0 mt-min mr-min drag-none">
    <div class="flex opacity-0 hover:opacity-100 pb-8 pl-8 transition">
      <div class="px-2 py-1 text-gray-400 hover:bg-gray-900 transition" @click="$emit('minimize')">
        <i class="far fa-window-minimize" />
      </div>
      <div class="px-2 py-1 text-gray-400 hover:bg-gray-900 transition" @click="$emit('close')">
        <i class="far fa-window-close" />
      </div>
    </div>
  </div>
</template>