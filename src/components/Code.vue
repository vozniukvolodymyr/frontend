<template>
  <div ref="rmodal">
    <div></div>
    <div style="max-width: 23rem">
      <div class="columns is-centered">
        <div class="column">
          <div class="card">
            <header class="card-header has-background-info">
              <div class="card-header-title">
                <span class="card-header-icon">
                  <font-awesome-icon :icon="['fas', 'lock']" size="3x" />
                </span>
                <p class="ml-4">
                  {{ transform(timewait) }}
                </p>
              </div>
            </header>
            <div class="card-content p-1">
              <div class="content">
                <p class="has-text-weight-bold">
                  {{ locale.code_confirminfo }}
                </p>
                <div class="control has-icons-left">
                  <input class="input" type="text" v-model="code" required />
                  <span class="icon is-small is-left">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                  </span>
                </div>
                <p>{{ confirmremark }}</p>
              </div>
            </div>
            <footer class="card-footer">
              <div class="buttons is-centered card-footer-item">
                <button :disabled="loading" class="button mx-0 px-1" @click="cancel">
                  {{ locale.code_btncancel }}
                </button>
                <button
                  :disabled="loading || timewait > 0"
                  class="button mx-3 px-1"
                  @click="repeat"
                >
                  {{ locale.code_btngetcode }}
                </button>
                <button
                  :disabled="!valid || loading"
                  class="button  mx-0 px-1"
                  @click="sendcode()"
                >
                  {{ locale.code_btnconfirm }}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "CodeComponent",
  props: {
    handler: Function,
    cancel: Function,
    repeat: Function,
    send: Function,
    loading: Boolean,
    modal: {
      type: [Boolean],
      required: false,
      default: true,
    },
  },
  computed: {
    ...mapGetters(["locale"]),
    confirmremark() {
      return this.locale.code_confirmremark.replace(`$1`, this.formconfirm);
    },
  },
  data: function () {
    const timerId = 0;
    const timewait = 0;
    const formconfirm = "";
    return { valid: false, code: "", timerId, timewait, formconfirm };
  },
  created() {
    this.$emit("handler", this.setFormconfirm);
  },
  setup() {
    const rmodal = ref<HTMLElement>();
    return { rmodal };
  },
  mounted() {
    if (this.rmodal && this.$props.modal === true) {
      this.rmodal.classList.toggle("modal");
      this.rmodal.querySelector("div")?.classList.toggle("modal-background");
    }
  },
  watch: {
    code(value) {
      this.code = value;
      if (value !== "" && value.length === 6) {
        this.valid = /^[0-9]+$/.test(value);
      } else {
        this.valid = false;
      }
    },
  },
  methods: {
    sendcode: function () {
      this.$emit("send", this.code);
    },
    transform: function (value: number): string {
      const minutes: number = Math.floor(value / 60);
      return (
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    },
    setFormconfirm: function (val: string) {
      if (val === "") {
        this.formconfirm = "";
        clearTimeout(this.timerId);
        this.code = "";
        if (this.rmodal && this.$props.modal === true) {
          if (this.rmodal.className.indexOf("is-active") > -1) {
            this.rmodal.classList.toggle("is-active");
          }
        }
      } else {
        this.formconfirm = val;
        this.timewait = 180;
        this.timerId = setInterval(() => {
          this.timewait = this.timewait - 1;
          if (this.timewait === 0) {
            clearTimeout(this.timerId);
          }
        }, 1000);
        if (this.rmodal) {
          if (this.$props.modal === true) {
            if (this.rmodal.className.indexOf("is-active") === -1) {
              this.rmodal.classList.toggle("is-active");
            }
          }
        }
        return true;
      }
    },
  },
});
</script>
