<template>
  <div class="flex">
    <button
      class="
        m-2
        mt-0
        w-6
        h-6
        rounded
        hover:bg-gray-100
        active:bg-gray-200
        hover:shadow-md
        text-center text-green-700
        hover:text-green-600
        active:text-green-500
        transition
        flex
        justify-center
        items-center
      "
      @click="$emit('add')"
    >
      <i class="fas fa-plus" />
    </button>
    <button
      class="
        m-2
        mt-0
        w-6
        h-6
        rounded
        hover:bg-gray-100
        active:bg-gray-200
        hover:shadow-md
        text-center text-red-700
        hover:text-red-600
        active:text-red-500
        transition
        flex
        justify-center
        items-center
      "
      @click="$emit('remove')"
    >
      <i class="fas fa-minus" />
    </button>
  </div>
</template>

<script>
export default {
  name: "Adder",
};
</script>
