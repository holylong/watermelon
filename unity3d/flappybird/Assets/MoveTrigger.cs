using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveTrigger : MonoBehaviour
{

    public Transform currentBg;
    public Pipe pipe1;
    public Pipe pipe2;
    public void OnTriggerEnter(Collider other)
    {
        Debug.Log("OnTriggerEnter");
        if(other.tag == "Player")
        {
            Transform firstBg =  GameManager._instance.firstBg;
            currentBg.position = new Vector3(firstBg.position.x + 10, currentBg.position.y, currentBg.position.z);

            GameManager._instance.firstBg = currentBg;

            pipe1.GeneratePosition();
            pipe2.GeneratePosition();
        }
    }
}
