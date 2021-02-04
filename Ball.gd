extends RigidBody2D

signal hit

# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	print("_ready") # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass

func playerHit():
	$clip.play()
	print("play")


func _on_Ball_body_entered(body):
	#hide()  # Player disappears after being hit.
	emit_signal("hit")
	$CollisionShape2D.set_deferred("disabled", true)


func _on_Ball_body_shape_entered(body_id, body, body_shape, local_shape):
	emit_signal("hit")


func _on_Ball_mouse_entered():
	emit_signal("hit")
