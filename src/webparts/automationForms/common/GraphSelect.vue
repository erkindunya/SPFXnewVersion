<template>
<div>
    <vue-select :label="label"
                :class="mainClass"
                :filterable="!lazyLoad"
                :searchable="true"
                :options="items"
                v-bind:value="value"
                v-on:input="$emit('input', $event)"
                @search="searchGraph"
                :filter-by="filterGraph"
                :multiple="multiple"
                >
        <template slot="no-options">
            <div @mousedown.stop="">
                Begin typing to search..
            </div>
        </template>
        <template slot="option" slot-scope="option">
            <slot name="option" v-bind="option">{{option[label]}}</slot>
        </template>
    </vue-select>
</div>
</template>
<style scoped></style>
<script lang="ts">
import Vue from 'vue';
import { sp, Search } from '@pnp/sp';
import { VueSelect } from 'vue-select';
import { debounce } from 'lodash';
import { MSGraph } from '../MSGraph';
import { constants } from 'http2';

export default Vue.extend({
    name: 'graph-select',
    props: {
        value: {
            type: Object
        },
        class: {
            type: String,
            default: ''
        },
        label: {
            default: 'mail',
            type: String
        },
        listName: {
            type: String
        },
        lazyLoad: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        query: {
            default: "",
            type: String
        },
        select: {
            default: "",
            type: String
        },
        version: {
            default: "",
            type: String
        },
        filter: {
            default: "",
            type: String
        },
    },
    data: () => ({
        items: <any[]>[]
    }),
    computed: {
        mainClass() {
            return this.class || {};
        }
    },
    methods: {
        searchGraph: debounce(function (search, loading) {
            if(this.lazyLoad) {
                loading(true);
                this.getFitleredValues(search);
                loading(false);
            }
        }, 1000),
        async getFitleredValues(search){
            console.log(this.filter);
            await MSGraph.Get(`/${this.query}`,"v1.0",[this.select],`${this.filter} and startswith(${this.select},'${search}')`).then((items) => {
                this.items = items.value; 
            });
        },
        filterGraph (option, label, search) {
            if(typeof option === 'object') {
                for (var key in option) {
                    var value = option[key];

                    if(typeof value === 'string' && value.toLowerCase().indexOf(search.toLowerCase()) > -1)
                        return true;
                }
                return false;
            } else {
                return (label || '').toLowerCase().indexOf(search.toLowerCase()) > -1;
            }
        }
    },
    async created() {
        if(!this.lazyLoad) {
            await MSGraph.Get(`/${this.query}`,"v1.0",[this.select],this.filter,999).then((items) => {
            this.items = items.value; 
        });
        }
    },
    components: {
        VueSelect
    }
});
</script>