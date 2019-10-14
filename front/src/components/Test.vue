<template>
<div class="test">
<h1>{{ msg }}</h1>
<button @click="mogemoge">ここ掘れわんわん</button>
<input type="text" @blur="piyo($event)">
</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {fugafuga} from '../models/Piyo';

@Component
export default class Test extends Vue {
    @Prop() private msg!: string;
    mogemoge () {
        alert("シャアザクだ！");
    }
    piyo (insert:string){
        fugafuga(insert);
    }
}

</script>
