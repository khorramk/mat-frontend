<template>
    <v-card
        style="height: calc(100vh - 97px); overflow-y: auto; position: fixed; right: 10px;"
        class="mx-auto"
        width="317"
    >
        <div class="pt-3 px-5">
            <p class="text-subtitle-1 mb-2 text--secondary">This Profile Overview</p>
            <hr>
            <table>
                <TableRow 
                    title="Name"
                    :value="profile.first_name + ' ' + profile.last_name"
                />
                <TableRow 
                    title="Age"
                    :value="profile.per_age + ' Years'"
                />
                <TableRow 
                    title="Height"
                    :value="getHeightPersonal"
                />
                <TableRow 
                    title="Nationality"
                    :value="profile.per_nationality"
                />
                <TableRow 
                    title="Ethnicity"
                    :value="profile.per_ethnicity"
                />
                <TableRow 
                    title="Country of Birth"
                    :value="personal.per_country_of_birth"
                />
                <TableRow 
                    title="Current Residence"
                    :value="personal.per_current_residence"
                />
                <TableRow 
                    title="Education"
                    :value="personal.per_education_level"
                />
                <TableRow 
                    title="Profession"
                />
                
                <!-- <template v-for="(item, i) in infoArr" >
                    <tr :key="i" v-if="item != 'first_name' && item != 'last_name' && item != 'image'">
                        <td style="width: 140px">{{ item }}</td>
                        <td style="width: 10px">:</td>
                        <td>{{ profile[item]}} </td>
                    </tr>
                </template> -->
            </table>

             <p class="text-subtitle-1 mb-2 text--secondary mt-4">This Profile Partner Preference</p>
             <hr>
             <table> 
                <TableRow 
                    title="Age"
                    :value="profile.preference.pre_partner_age_min + ' to ' + profile.preference.pre_partner_age_max"
                />
                <TableRow 
                    title="Height"
                    :value="getMinHeight + ' to ' + getMaxHeight"
                />
                <TableRow 
                    title="Country & Cities Preferred"
                    :value="getCountry()"
                />
                <TableRow 
                    title="Religion"
                    :value="getReligion()"
                />
                <TableRow 
                    title="Ethnicity"
                    :value="profile.preference.pre_ethnicities"
                />
                <TableRow 
                    title="Nationality"
                    :value="getNationality()"
                />
                <TableRow 
                    title="Education"
                    :value="preference.pre_study_level"
                />
                <TableRow 
                    title="Profession"
                    :value="getProfession()"
                />
                <!-- <tr>
                    <td class="text--disabled text-subtitle-1" style="width: 50px">Country & Cities Preferred</td>
                    <td class="text-subtitle-1" style="width: 20px ">:</td>
                    <td class="text--secondary text-subtitle-1">
                        <div
                            v-for="(country, index) in countries || []"
                            :key="country.id"
                            >
                                {{ country.name }},
                                {{
                                candidateData.preference.preferred_cities[index]
                                    .name
                                }}
                        </div>
                    </td>
                </tr> -->
            
                <!-- <tr>
                    <td class="text--disabled text-subtitle-1" style="width: 50px">Willing to Relocate</td>
                    <td class="text-subtitle-1" style="width: 20px ">:</td>
                    <td class="text--secondary text-subtitle-1"></td>
                </tr> -->
            </table>
        </div>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import TableRow from '@/components/atom/ListItem'
import { HEIGHTS } from "@/models/data";
export default {
    name: 'RightSideCandidateDetail',
    components: {
        TableRow
    },
    data: () => ({
      HEIGHTS  
    }),
    computed: {
        ...mapGetters({
            profile: 'search/getSelectedProfileInfo'
        }),
        infoArr() {
            return Object.keys(this.profile)
        },
        preference() {
            return this.profile.preference
        },
        personal() {
            return this.profile.personal
        },
        getMaxHeight() {
            return this.preference.pre_height_max ? this.HEIGHTS[this.preference.pre_height_max - 1].name : ''
        },
        getMinHeight() {
            return this.preference.pre_height_min ? this.HEIGHTS[this.preference.pre_height_min - 1].name : ''
        },
        getHeightPersonal() {
            return this.personal.per_height ? this.HEIGHTS[this.personal.per_height - 1].name : ''
        }
    },
    methods: {
        getCountry() {
            let cityArr = [];
            if(this.profile.preference.preferred_cities.length) {
                this.profile.preference.preferred_cities.map(city => {
                    cityArr.push(city.name)
                })
            }
            return cityArr.join(', ')
        },
        getNationality() {
            let cityArr = [];
            if(this.profile.preference.preferred_nationality.length) {
                this.profile.preference.preferred_nationality.map(city => {
                    cityArr.push(city.name)
                })
            }
            return cityArr.join(', ')
        },
        getProfession() {
            if(this.profile.preference.pre_occupation.length) {
                return JSON.parse(this.profile.preference.pre_occupation).join(', ')
            }
            return ''
        },
        getReligion() {
            if(this.preference.pre_partner_religion.length) {
                return this.preference.pre_partner_religion.join(', ')
            }
            return ''
        }
    }
}
</script>
