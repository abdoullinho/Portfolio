console.clear();

const { gsap } = window;

gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(CustomEase);

gsap.ticker.fps(24);

const morphs = {
	original: gsap.utils.toArray("#morph-original path"),
	stretched: gsap.utils.toArray("#morph-stretched path"),
	small: gsap.utils.toArray("#morph-small path")
};

const TL_DEFAULTS = {
	delay: 1,
	defaults: {
		duration: 1,
		stagger: {
			each: 0.038,
			from: "center"
		}
	},
	repeat: -1,
	repeatDelay: 1
};

const CUSTOM_EASE = {
	jump: CustomEase.create(
		"jump",
		"M0,0 C0.084,0.61 0.14,0.788 0.236,0.878 0.337,0.972 0.374,1 1,1 "
	),
	drop: CustomEase.create(
		"drop",
		"M0,0,C0.25,0,0.258,0.024,0.314,0.07,0.399,0.14,0.466,0.292,0.498,0.502,0.532,0.73,0.552,0.992,0.604,0.998,0.613,0.999,0.698,1,1,1"
	)
};

function animate(el) {
	const tl = gsap.timeline(TL_DEFAULTS);

	tl.addLabel("start", 0).addLabel("upcoming", 0.8).addLabel("end", 1.35);
	tl.timeScale(1.15);

	tl
		.to(
			el,
			{
				duration: 0.8,
				morphSVG: (i) => morphs.small[i],
				stagger: null,
				ease: "none"
			},
			"start"
		)
		.to(
			el,
			{
				duration: 0.8,
				y: -60,
				ease: CUSTOM_EASE.jump,
				morphSVG: (i) => morphs.stretched[i]
			},
			"upcoming"
		)
		.to(
			el,
			{
				y: 0,
				ease: CUSTOM_EASE.drop
			},
			"end"
		)
		.to(
			el,
			{
				duration: 0.5,
				morphSVG: (i) => morphs.small[i],
				ease: CUSTOM_EASE.drop
			},
			"end+=0.2"
		)
		.to(
			el,
			{
				duration: 0.7,
				morphSVG: (i) => morphs.original[i],
				ease: "elastic.out(1, 1)"
			},
			"end+=.6"
		);
}

animate(".boost-1 path");
animate(".boost-2 path");
