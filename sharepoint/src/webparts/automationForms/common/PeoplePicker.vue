<template>
<div :class="mainClass">
    <vue-select label="DisplayText"
                :filterable="false"
                :options="people"
                v-bind:value="value"
                v-on:input="$emit('input', $event)"
                @search="searchPeople">
        <template slot="option" slot-scope="option">
            {{ option.DisplayText }} ({{ option.EntityData.Email || "No Email" }})
        </template>
    </vue-select>
</div>
</template>
<style scoped></style>
<script lang="ts">
import Vue from 'vue';
import { sp, PeoplePickerEntity } from '@pnp/sp';
import { VueSelect } from 'vue-select';
import { debounce } from 'lodash';

export default Vue.extend({
    name: 'people-picker',
    props: ['value', 'class'],
    data: () => ({
        people: <PeoplePickerEntity[]>[]
    }),
    computed: {
        selectedValue() {
            return this.value || "";
        },
        mainClass() {
            return this.class || {};
        }
    },
    methods: {
        searchPeople: debounce(function (search, loading) {
            loading(true);
            sp.profiles.clientPeoplePickerSearchUser({
                    'AllowEmailAddresses':true,
                    'AllowMultipleEntities':false,
                    'AllUrlZones':false,
                    'MaximumEntitySuggestions':10,
                    'PrincipalSource':15,
                    'PrincipalType': 1,
                    'QueryString': search
                }).then(res => {
                    this.people = res;
                    loading(false);
                });
        })
    },
    components: {
        VueSelect
    }
});
</script>