<template>
  <div class="overlay overlay-info" @click="$emit('close')">
    <div id="info" @click.stop>
      <button id="info_close" class="btn btn-primary btn-circle-small" @click="$emit('close')">
        <span class="material-icons-round">clear</span>
      </button>
      <h2>{{ title }}</h2>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info_modal",
  props: ['title']
}
</script>

<style lang="scss">
@import "../styles/constants.scss";

.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - #{$navbar-height});
  background-color: rgba(white, 0.75);
  display: flex;
  padding: 20px 10px;
  justify-content: center;
  flex-wrap: wrap;
  font-size: $text;

  &.overlay-info {
    align-items: center;
  }

  &.overlay-action {
    align-items: flex-end;
  }

  #info {
    position: relative;
    border: 3px solid $primary;
    border-radius: 35px;
    background-color: $secondary;
    width: 75%;
    min-width: 300px;
    max-height: 100%;
    padding: 50px 20px 20px 20px;
    color: $primary;
    box-shadow: $shadow;
    display: flex;
    flex-direction: column;

    #info_close {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .content {
      overflow: auto;
      padding: 5px 0;

      .table * {
        padding: 0 !important;
      }

      .line {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin: 10px 0;

        .label {
          margin-right: 20px;
          font-weight: bold;
          min-width: 105px;
          text-align: right;
        }

        select, input {
          max-width: 230px;
        }

        .check-group {
          text-align: left;
        }
      }

      .links {
        font-size: smaller;

        span:first-of-type {
          font-weight: bold;
          margin-right: 20px;
        }

        span:not(:first-of-type):not(:last-of-type)::after {
          margin: 0 5px;
          content: "|";
        }
      }
    }
  }

  @media screen and (max-width: 450px) {
    #info {
      width: 90%;
      padding: 50px 5px 15px 5px;
      margin: 10px;
    }
  }
}
</style>
