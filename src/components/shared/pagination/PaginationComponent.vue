<template>
  <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" v-if="pagination.has_pre"
          @click.prevent="this.showLoading();$emit('getData', pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
          <span class="page-link" v-else>
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="`page${page}`"
        :class="{'active': page === pagination.current_page}" >
          <a class="page-link" href="#" v-if="page !== pagination.current_page"
          @click.prevent="this.showLoading(); $emit('getData', page);">{{ page }}</a>
          <span class="page-link" v-else>{{ page }}</span>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" v-if="pagination.has_next"
          @click.prevent="this.showLoading();$emit('getData', pagination.current_page + 1);">
            <span aria-hidden="true">&raquo;</span>
          </a>
          <span class="page-link" v-else>
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
</template>
<script>
import loadingStore from '@/stores/loadingStore';

import { mapActions } from 'pinia';

export default {
  props: ['pagination'],
  methods: {
    ...mapActions(loadingStore, ['showLoading']),
  },
};
</script>
