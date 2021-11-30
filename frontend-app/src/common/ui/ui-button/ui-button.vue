<template>
  <button
    class="ui-button"
    :class="{ [getClassByVariant(variant)]: true }"
    :type="type"
    :disabled="disabled"
    :style="buttonStyle"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ButtonVariants, ButtonTypes } from "./ui-button.types";

@Component({
  name: "UiButton",
})
export default class UiButton extends Vue {
  @Prop({ type: String, default: ButtonVariants.BLUE })
  variant!: ButtonVariants;
  @Prop({ type: String, default: ButtonTypes.SUBMIT }) type!: ButtonTypes;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;
  @Prop({ type: String, default: "0 20px" }) padding!: string;
  @Prop({ type: String, default: "0" }) margin!: string;
  @Prop({ type: Number, default: 0 }) letterSpacing!: string;
  @Prop({ type: Number, default: 56 }) height!: number;
  @Prop({ type: Number, default: 6 }) borderRadius!: number;
  @Prop({ type: Number, default: 16 }) fontSize!: number;
  @Prop({ type: String, default: "189px" }) minWidth!: string;

  get buttonStyle(): { [key: string]: string } {
    return {
      height: `${this.height}px`,
      padding: `${this.padding}`,
      margin: `${this.margin}`,
      letterSpacing: `${this.letterSpacing}px`,
      borderRadius: `${this.borderRadius}px`,
      fontSize: `${this.fontSize}px`,
      minWidth: this.minWidth,
    };
  }

  getClassByVariant(variant: ButtonVariants): string {
    return `ui-button--${variant}`;
  }
}
</script>

<style scoped lang="scss">
.ui-button {
  cursor: pointer;
  font-weight: 500;
  line-height: 128%;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.6;
  }

  &--blue {
    color: #fff;
    background-color: $blue;

    &:hover,
    &:focus {
      background: #109cf1;
    }

    &:active {
      background: #39adf3;
    }

    &:disabled {
      background: #b5c1d2;
      color: #7991b4;
      cursor: default;
    }
  }

  &--white {
    color: $text-color;
    border: 1px solid $blue;
    background-color: #fff;

    &:disabled {
      border: 1px solid #eee;
    }
  }
}
</style>
