import { Component } from "@angular/core";
import {
    IonicPage,
    NavController,
    NavParams,
    LoadingController
} from "ionic-angular";
import "rxjs/add/operator/map";
import { RedditDataProvider } from "../../providers/reddit-data/reddit-data";
import { InAppBrowser } from "@ionic-native/in-app-browser";
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    public feeds: Array<string>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private redditData: RedditDataProvider,
        public loadingCtrl: LoadingController,
        private browser: InAppBrowser
    ) {
        this.feeds = [];
        this.getData();
    }
    private olderPosts: string = "https://www.reddit.com/new.json?after=";
    private getData() {
        let loading = this.loadingCtrl.create({
            content: "Carregando dados..."
        });
        loading.present();
        this.redditData.getRemoteData().then(data => {
            let newdata = data.data.children;
            this.thumbFixer(newdata);
            this.feeds = newdata.concat(this.feeds);
            loading.dismiss();
        });
    }
    itemSelected(url) {
        this.browser.create(url, "_system");
    }
    ionViewDidLoad() {
        console.log("ionViewDidLoad HomePage");
    }
    thumbFixer(list) {
        list.forEach((e, i, a) => {
            if (
                !e.data.thumbnail ||
                e.data.thumbnail.indexOf("b.thumbs.redditmedia.com") === -1
            ) {
                e.data.thumbnail = "https://www.redditstatic.com/icon.png";
            }
        });
    }
    doInfinite(infiniteScroll) {
        let paramsUrl =
            this.feeds.length > 0
                ? this.feeds[this.feeds.length - 1].data.name
                : "";

        this.redditData
            .getRemoteData({ key: "after", value: this.olderPosts + paramsUrl })
            .then(data => {
                let newdata = data.data.children;
                this.thumbFixer(newdata);
                this.feeds = this.feeds.concat(newdata);
                infiniteScroll.complete();
            });
    }

    doRefresh(refresher) {
        let paramsUrl = this.feeds[0].data.name;

        this.redditData
            .getRemoteData({ key: "after", value: this.olderPosts + paramsUrl })
            .then(data => {
                let newdata = data.data.children;
                this.thumbFixer(newdata);
                this.feeds = newdata.concat(this.feeds);
                refresher.complete();
            });
    }
}
