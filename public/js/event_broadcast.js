//please refer audiojs first.

EventBroadcaster = {
  _pollUrl:null,
  _pollInterval:5000,
  _audioUrl:null,
  _playList:[],
  _prevAudioId:null,
  getAudio: function(){
    return this.audio;
  },
  init: function(pollUrl, pollInterval){
    if(!pollUrl) {
      console.log("illegal poll url!");
      return;
    }

    this._pollUrl = pollUrl;

    if(typeof pollInterval !== "undefined") {
      this._pollInterval = pollInterval;
    }

    this._setItem("playedAudios", "");
    this._initPlayer();
  },
  _initPlayer: function(){
    try {
      if(audiojs) {
        var $this = this;
        audiojs.events.ready($.proxy(function() {
          var as = audiojs.createAll();
          $this.audio = as[0];

          $this._loadAudios();
          $this._play();

          $(document.getElementsByTagName('audio')).css("visibility", "visible");
        }, this));
      }
    } catch(error) {
      if(typeof console !== "undefined")
        console.warn("Not support html5 audio:" + error);
    }
  },
  _loadAudios: function(){
    if(this._playList.length > 0) {
      window.setTimeout($.proxy(this._loadAudios, this), 500);
      return;
    }

    var $this = this;
    var pUrl = this._pollUrl;
    if(this._prevAudioId) {
      pUrl += "&confirm=" + this._prevAudioId;
    }
    $.ajax({
      url:pUrl,
      dataType:"json",
      success:function(result){
        if(result) {
          console.log("Found audio `" + JSON.stringify(result) + "` with `" + pUrl + "`")
          $this._playList = [{id:result.id,url:result.url}];
          window.setTimeout($.proxy($this._loadAudios, $this), 10000);
        } else {
          window.setTimeout($.proxy($this._loadAudios, $this), $this._pollInterval);
        }

      },
      error:function(){
        window.setTimeout($.proxy($this._loadAudios, $this), $this._pollInterval);
      }
    })
  },
  _play: function(){
    if(this._playList.length > 0 ) {
      var playedAudios = this._getItem("playedAudios");
      if(!playedAudios) {
        playedAudios = "";
        this._setItem("playedAudios", playedAudios);
      }

      var audio = this._playList.pop();
      if(playedAudios.indexOf(audio.id) < 0) {
        playedAudios = playedAudios + "," + audio.id;

        try {
          this.audio.load(encodeURI(audio.url));
          this.audio.play();
          this._prevAudioId = audio.id;
          this._setItem("playedAudios", playedAudios);
        } catch (er) {
          alert(er)
        }
      }
      window.setTimeout($.proxy(this._play, this), 3000);
    } else {
      window.setTimeout($.proxy(this._play, this), 100);
    }
  },
  _setItem: function (key, value) {
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        window.localStorage.clear();
      }
    }
  },
  _getItem: function (key) {
    if (window.localStorage)
      try {
        window.localStorage.setItem("test", "test");
        return window.localStorage.getItem(key);
      } catch (error) {
        window.localStorage.clear();
        return null;
      }
    else
      return null;
  }
};