export default {
    props: ['currentuser'],

    template: `
    <div class="container">
        <div class="row">
            <div class="col-sm-3">
                <p>media details go here</p>
            </div>

            <div class="col-sm-9">
                <span class="volume-up" @click="logClicked" :class="{ 'vol-on': vidActive }">
                    <i class="fas fa-volume-up"></i>
                </span>            
                               
                <video autoplay muted :src="'video/' + currentVideo" class="fs-video"></video>
            </div>
        </div>

        <div class="row"> <!-- 2-up for nav and media info -->
            <nav class="col-sm-3 side-nav">
                <ul class="media-type">
                    <li v-for="media in mediaTypes">
                        <i v-bind:class="[media.iconClass]"></i>
                    </li>
                </ul>
            </nav>

            <div class="col-sm-9 media-info">
                <h1 class="user-message">This is the user home component</h1>
                <pre>{{ this.currentuser }}</pre>
                <p v-if="currentuser">{{message}} {{currentuser.username}}</p>
            </div>       
        </div> <!-- end 2-up for media info -->
    </div>
    `,

    data() {
        return {
            message: "sup",

            currentVideo: "avengers.mp4",

            mediaTypes: [
                { iconClass: "fas fa-headphones" },
                { iconClass: "fas fa-film"},
                { iconClass: "fas fa-tv-retro"}
            ],

            vidActive: false
        }
    },

    created: function() {
        console.log('params:', this.$route.params);
    },

    methods: {
        logClicked(e) {
            console.log("trying shorthand click");
            this.vidActive = !this.vidActive;

            let vid = document.querySelector('video');
            vid.muted = !vid.muted;
        }
    }
}