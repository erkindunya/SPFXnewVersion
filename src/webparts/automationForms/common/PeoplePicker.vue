<template>
<div>
    <vue-select label="DisplayText"
                :class="mainClass"
                :filterable="false"
                :options="people"
                v-bind:value="value"
                v-on:input="$emit('input', $event)"
                @search="searchPeople">
        <template slot="no-options">
            <div @mousedown.stop="">
                Begin typing to search..
            </div>
        </template>
        <template slot="option" slot-scope="option">
            {{ option.DisplayText }} ({{ option.EntityData.Email || "No Email" }}) {{ option.EntityData.Department}}
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
import { setup } from '@pnp/sp/src/config/splibconfig';

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
        searchPeople: debounce(async function (search, loading) {
            loading(true);
            const standardSearch = sp.profiles.clientPeoplePickerSearchUser({
                'AllowEmailAddresses':true,
                'AllowMultipleEntities':false,
                'AllUrlZones':false,
                'MaximumEntitySuggestions':20,
                'PrincipalSource':15,
                'PrincipalType': 1,
                'QueryString': search
            });
            
            if(search.indexOf(' ') > -1) {
                const newSearch = search.split(' ').reverse().join(', ');
                const rearrangedSearch = sp.profiles.clientPeoplePickerSearchUser({
                    'AllowEmailAddresses':true,
                    'AllowMultipleEntities':false,
                    'AllUrlZones':false,
                    'MaximumEntitySuggestions':20,
                    'PrincipalSource':15,
                    'PrincipalType': 1,
                    'QueryString': newSearch
                });
                const results = await Promise.all([standardSearch, rearrangedSearch]);
                this.people = results[0].concat(results[1]);
            } else {
                const searchResults = await standardSearch;
                const validatedResults = searchResults.map((item) => { return (item.EntityData.PrincipalType !== "UNVALIDATED_EMAIL_ADDRESS") ? item: null;});
                validatedResults.map((item) => { (item) ? this.people = searchResults: loading(false);});
                }
            loading(false);
        }, 800)
    },
    components: {
        VueSelect
    }
});
</script>