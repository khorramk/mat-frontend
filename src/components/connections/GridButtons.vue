<template>
  <div class="mt-2">
    <div v-if="type == 'connected'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            rounded
            outlined
            small
            style="width: 47%"
            dark
            @click="$emit('disconnectTeam')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="disconnect" class="mr-2" />
            Disconnect
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="block" class="mr-2" />
            Block
          </div>
        </v-btn>
      </div>
      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            small
            outlined
            color=""
            dark
            @click="$emit('gotoChat')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="wechat" class="mr-2" />
            Chat
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="user" class="mr-2" />
            View Profile
          </div>
        </v-btn>
      </div>
    </div>
    <div v-if="type == 'Request received'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            small
            outlined
            color=""
            dark
            @click="$emit('acceptRequest')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="check" class="mr-2" />
            Accept
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            small
            outlined
            color=""
            dark
            @click="$emit('declineRequest')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="disconnect" class="mr-2" />
            Decline
          </div>
        </v-btn>
      </div>
      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="block" class="mr-2" />
            Block
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="user" class="mr-2" />
            View Profile
          </div>
        </v-btn>
      </div>
    </div>
    <div v-if="type == 'Request send'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('declineRequest')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="cross" class="mr-2" />
            Cancel
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 47%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="block" class="mr-2" />
            Block
          </div>
        </v-btn>
      </div>

      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            block
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="user" class="mr-2" />
            View Profile
          </div>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridButtons",
  props: ['type'],
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.block-button {
  background: $bg-brand;
}
.block-button:hover {
  background: $bg-brand;
}

.grid-action-btn {
  border-color: #f9f9f9;
}

.btn-success {
  background: #3ab549;
  color: #FFFFFF;
}
.btn-success:hover {
  background: #3ab549;
}

.btn-decline {
  background: #fa4942;
  color: #FFFFFF;
}
.btn-decline:hover {
  background: #fa4942;
}

.btn-info {
  background: #1bb9c2;
}
.btn-info:hover {
  background: #1bb9c2;
}
.btn-connection:hover {
  box-shadow: 0 1px 6px #787474;
  border: 1px solid white !important;
  background: $bg-primary;
  color: $color-white !important;
}
</style>