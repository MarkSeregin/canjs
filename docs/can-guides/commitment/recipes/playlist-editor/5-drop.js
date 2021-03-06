import {
	addJQueryEvents,
	ObservableArray,
	StacheElement,
	type
} from "//unpkg.com/can@6/core.mjs";

addJQueryEvents(jQuery);

class PlaylistEditor extends StacheElement {
	static view = `
		{{# if(this.googleApiLoadedPromise.isPending) }}
			<div>Loading Google API…</div>
		{{ else }}
			{{# if(this.signedIn) }}
				Welcome {{ this.givenName }}! <button on:click="this.googleAuth.signOut()">Sign Out</button>
			{{ else }}
				<button on:click="this.googleAuth.signIn()">Sign In</button>
			{{/ if }}

			<div>
				<input value:bind="this.searchQuery" placeholder="Search for videos">
			</div>

			{{# if(this.searchResultsPromise.isPending) }}
				<div class="loading">Loading videos…</div>
			{{/ if }}

			{{# if(this.searchResultsPromise.isResolved) }}
				<ul class="source">
					{{# for(searchResult of this.searchResultsPromise.value) }}
						<li on:draginit="this.videoDrag(scope.arguments[1])" 
								{{ domData("dragData", searchResult) }}>
							<a draggable="false" href="https://www.youtube.com/watch?v={{ searchResult.id.videoId }}" target="_blank">
								<img draggable="false" src="{{ searchResult.snippet.thumbnails.default.url }}" width="50px">
							</a>
							{{ searchResult.snippet.title }}
						</li>
					{{/ for }}
				</ul>
			{{/ if }}

			{{# if(this.searchResultsPromise.value.length) }}
				<div class="new-playlist">
					<ul
						on:dropover="this.addDropPlaceholder(0,this.getDragData(scope.arguments[2]))"
						on:dropout="this.clearDropPlaceholder()"
						on:dropon="this.addVideo(0,this.getDragData(scope.arguments[2]))"
					>
						{{# for(videoWithDropPlaceholder of this.videosWithDropPlaceholder) }}
							<li class="{{# if(videoWithDropPlaceholder.isPlaceholder) }}placeholder{{/ if }}">
								<a href="https://www.youtube.com/watch?v={{ videoWithDropPlaceholder.video.id.videoId }}" target="_blank">
									<img src="{{ videoWithDropPlaceholder.video.snippet.thumbnails.default.url }}" width="50px">
								</a>

								{{ videoWithDropPlaceholder.video.snippet.title }}
							</li>
						{{ else }}
							<div class="content">Drag video here</div>
						{{/ for }}
					</ul>
				</div>
			{{/ if }}
		{{/ if }}
	`;

	static props = {
		googleApiLoadedPromise: {
			get default() {
				return googleApiLoadedPromise;
			}
		},

		googleAuth: {
			async(resolve) {
				this.googleApiLoadedPromise.then(() => {
					resolve(gapi.auth2.getAuthInstance());
				});
			}
		},

		signedIn: Boolean,

		get givenName() {
			return (
				this.googleAuth &&
				this.googleAuth.currentUser
					.get()
					.getBasicProfile()
					.getGivenName()
			);
		},

		searchQuery: "",

		dropPlaceholderData: type.Any,

		playlistVideos: {
			get default() {
				return new ObservableArray();
			}
		},

		get searchResultsPromise() {
			if (this.searchQuery.length > 2) {
				return gapi.client.youtube.search
					.list({
						q: this.searchQuery,
						part: "snippet",
						type: "video"
					})
					.then(response => {
						console.info("Search results:", response.result.items);
						return response.result.items;
					});
			}
		},

		get videosWithDropPlaceholder() {
			const copy = this.playlistVideos.map(video => {
				return {
					video: video,
					isPlaceholder: false
				};
			});
			if (this.dropPlaceholderData) {
				copy.splice(this.dropPlaceholderData.index, 0, {
					video: this.dropPlaceholderData.video,
					isPlaceholder: true
				});
			}
			return copy;
		}
	};

	connected() {
		this.listenTo("googleAuth", ({ value: googleAuth }) => {
			this.signedIn = googleAuth.isSignedIn.get();
			googleAuth.isSignedIn.listen(isSignedIn => {
				this.signedIn = isSignedIn;
			});
		});
	}

	videoDrag(drag) {
		drag.ghost().addClass("ghost");
	}

	getDragData(drag) {
		return can.domData.get(drag.element[0], "dragData");
	}

	addDropPlaceholder(index, video) {
		this.dropPlaceholderData = {
			index: index,
			video: video
		};
	}

	clearDropPlaceholder() {
		this.dropPlaceholderData = null;
	}

	addVideo(index, video) {
		this.dropPlaceholderData = null;
		if (index >= this.playlistVideos.length) {
			this.playlistVideos.push(video);
		} else {
			this.playlistVideos.splice(index, 0, video);
		}
	}
}

customElements.define("playlist-editor", PlaylistEditor);
