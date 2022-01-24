extends Node

signal start_game


export (PackedScene) var Ball

func _input(event):
	if event.is_action_pressed("click"):
		var new_ball = Ball.instance()
		new_ball.position = get_viewport().get_mouse_position()
		add_child(new_ball)
	elif event is InputEventScreenTouch:
		if event.pressed:
			var new_ball = Ball.instance()
			new_ball.position = get_viewport().get_mouse_position()
			add_child(new_ball)
		else:
			print("hello world")

func _ready():
	#$BackPlayer.play()
	emit_signal("start_game")

	
func game_over():
	$BackPlayer.stop()

func new_game():
	#$BackPlayer.play()
	print("hello wotld")

var state = {}

func _unhandled_input(event):
	if event is InputEventScreenTouch:
		if event.pressed: # Down.
			state[event.index] = event.position
		else: # Up.
			state.erase(event.index)
		get_tree().set_input_as_handled()

	elif event is InputEventScreenDrag: # Movement.
		state[event.index] = event.position
		get_tree().set_input_as_handled()



