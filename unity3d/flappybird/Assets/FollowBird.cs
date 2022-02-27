using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FollowBird : MonoBehaviour
{
    private GameObject bird;
    private Transform birdTransform;
    // Start is called before the first frame update
    void Start()
    {
        bird = GameObject.FindGameObjectWithTag("Player");
        birdTransform = bird.transform;
    }

    // Update is called once per frame
    void Update()
    {
        Vector3 birdPos = birdTransform.position;
        this.transform.position = new Vector3(birdPos.x + 3.63f, birdPos.y - 3.5088f, birdPos.z - 9);
    }
}
