extends RigidBody2D
signal hit
# Declare member variables here. Examples:
# var a = 2
# var b = "text"
func _on_Ball_hit():
	$clip.play()

# Called when the node enters the scene tree for the first time.
func _ready():
	print("_ready") # Replace with function body.
	emit_signal("hit")

# Called every frame. 'delta' is the elaped time since the previous frame.
#func _process(delta):
#	pass

func _on_Ball_body_entered(body):
	#hide()  # Player disappears after being hit.
	print("_on_Ball_body_entered")
	emit_signal("hit")
	$CollisionShape2D.set_deferred("disabled", true)


func _on_Ball_body_shape_entered(body_id, body, body_shape, local_shape):
	print("_on_Ball_body_shape_entered")
	emit_signal("hit")


func _on_Ball_mouse_entered():
	print("_on_Ball_mouse_entered")
	emit_signal("hit")
